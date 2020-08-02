import Nullstack from 'nullstack';
import ChampionForm from './ChampionForm';

class ChampionDetails extends Nullstack {

  static async deleteChampion({database, slug, version}) {
    await database.collection('champions').deleteOne({slug, version});
  }

  async confirmDeleteChampion(context) {
    const slug = context.slug;
    const version = context.version;
    if(confirm('Do you really want to delete this champion from the database?')) {
      await this.deleteChampion({slug, version});
      context.champions = context.champions.filter((champion) => champion.slug != slug);
      context.router.url = '/';
    }
  }

  renderDeleteButton({slug, version}) {
    return (
      <div class="xr md+x3 yy">
        <button onclick={this.confirmDeleteChampion} slug={slug} class="xx p4y p6x bg1 bg10h c0h x0">
          <span class="xx ff5"> Remove champion </span>
        </button>
        <small class="xr m1t"> ※ version {version} from database </small>
      </div>
    )
  }

  renderChampion({portrait, name, title, tags}) {
    return (
      <div class="xl md+x9 m2b">
        <div class="sm-x3 xl md+x2">
          <img src={portrait} alt={name} class="x0" />
        </div>
        <div class="sm-x9 sm-p2l xl md+x10 yt">
          <h1 class="xl c3">{name}</h1>
          <h2 class="xl c6"> {title} </h2>
          <p> {tags.join(', ')} </p>
        </div>
      </div>
    )
  }

  renderSkill({icon, name, description, type}) {
    return (
      <div class="xl bg1 p3 m2b">
        <div class="sm-x3 xl md+x1">
          <img src={icon} alt={name} class="x0 y0" />
        </div>
        <div class="sm-x9 xl md+x11">
          <p class="xl"> 
            <span class="ff5 f2"> {name} </span>
            {type === 'passive' && <small> (Passive) </small> }
          </p>
          <p class="xl" html={description} />
        </div>
      </div>
    )
  }

  renderMissing({params, version}) {
    return (
      <div class="xl md+p3">
        <h1 class="xx p5y"> 
          <span class="sm-xx c3 md+x0"> {params.slug} </span>
          <span class="sm-xx md+x0 m2x"> not found on version </span>
          <span class="sm-xx c6 md+x0"> {version} </span>
        </h1>
        <ChampionForm slug={params.slug} />
      </div>
    )
  }

  renderDetails({champion}) {
    return (
      <div class="xl p3">
        <Champion {...champion} />
        <DeleteButton {...champion} />
        <div class="xl m3t">
          {champion.skills.map((skill) => <Skill {...skill} />)}
        </div>
      </div>
    )
  }

  render({champions, params}) {
    const champion = champions.find((champion) => champion.slug === params.slug); 
    return (
      <div class="xxx">
        {champion && <Details champion={champion} />}
        {!champion && <Missing champion={champion} />}
      </div>
    )
  }

}

export default ChampionDetails;