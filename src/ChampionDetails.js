import Nullstack from 'nullstack';

class ChampionDetails extends Nullstack {

  static async fetchChampionInfo({database, riotBaseDataUrl, riotBaseImageUrl, slug}) {
    const response = await fetch(`${riotBaseDataUrl}/${slug}.json`);
    const json = await response.json();
    const data = json.data[slug];

    const title = data.title;
    const portrait = `${riotBaseImageUrl}/champion/${data.image.full}`;
    const tags = data.tags;
    const partype = data.partype;
    const stats = data.stats;
    // TODO: save character

    const spells = data.spells;
    const passive = data.passive;
    // TODO: save skills

    // TODO: case character does not exist in riot api
  }

  async getChampionInfo({slug}) {
    await this.fetchChampionInfo({slug});
  }

  render({champions, params}) {
    const champion = champions.find(champion => champion.slug === params.slug);

    return (
      <div>
        <h1>{champion.name}</h1>
        <button title="Get champion info from the Riot Games API" onclick={this.getChampionInfo} slug={champion.slug}>Get champion info</button>
      </div>
    )
  }

}

export default ChampionDetails;