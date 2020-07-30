import Nullstack from 'nullstack';

class ChampionDetails extends Nullstack {

  render({champions, params}) {
    const champion = champions.find(champion => champion.slug === params.slug);

    return (
      <div>
        <h1>{champion.name}</h1>
        <button title="Get champion info from the Riot Games API">Get champion info</button>
      </div>
    )
  }

}

export default ChampionDetails;