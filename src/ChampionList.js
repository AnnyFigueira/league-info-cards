import Nullstack from 'nullstack';
import ChampionForm from './ChampionForm';

class ChampionList extends Nullstack {
  
  renderChampion({name, slug}) {
    return (
      <li>
        <a href={`/champions/${slug}`}>{name}</a>
      </li>
    )
  }

  render({champions}) {
    return (
      <div> 
        <h1>Champion List</h1>
        <ul>
          {champions.map((champion) => <Champion {...champion} />)}
        </ul>
        <ChampionForm />
      </div>
    )
  }

}

export default ChampionList;