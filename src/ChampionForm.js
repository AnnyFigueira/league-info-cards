import Nullstack from 'nullstack';

class ChampionForm extends Nullstack {
  
  slug = "";

  initialize({slug}) {
    if(slug) {
      this.slug = slug;
    }
  }

  static async insert({database, versions, riotEndpoint, slug, version}) {
    if (!slug) {
      return {error: 'Slug cannot be blank'};
    };

    if(!versions.includes(version)) {
      return {error: 'Version does not exist'};
    };

    const taken = await database.collection("champions").findOne({slug, version});
    if (taken) {
      return {error: "Champion already registered in this version"};
    };
    
    try {
      const championEndpoint = `${riotEndpoint}/cdn/${version}/data/en_US/champion/${slug}.json`;
      const response = await fetch(championEndpoint);
      const json = await response.json();
      const {image, name, title, tags, spells, passive} = json.data[slug];
      const portrait = `${riotEndpoint}/cdn/${version}/img/champion/${image.full}`;

      const payload = {slug, name, title, portrait, tags, version};
      payload.skills = [...spells, passive].map((skill) => {
        const slug = skill.id || skill.name;
        const type = skill.id ? 'spell' : 'passive';
        const name = skill.name;
        const icon = `${riotEndpoint}/cdn/${version}/img/${type}/${skill.image.full}`;
        const description = skill.description
        return {slug, name, icon, description, type};
      });
 
      const {ops} = await database.collection('champions').insertOne(payload);
      return {champion: ops[0]};
    } catch(e) {
      return {error: e.message};
    }
  }

  async create(context) {
    const {error, champion} = await this.insert({
      slug: this.slug,
      version: context.version
    });
    if(error) {
      alert(error);
    } else {
      context.champions = [...context.champions, champion]; 
      context.router.url = `/champions/${champion.slug}`;
    }
  }

  render({versions}) {
    return (
      <form onsubmit={this.create} class="xl">
        <input type="text" bind="slug" placeholder="New Champion Slug" class="xl bc1 x10 p3x" />
        <button class="xx p4y p6x bg3 bg4h c0 x2"> Create </button>
      </form>
    )
  }

}

export default ChampionForm;