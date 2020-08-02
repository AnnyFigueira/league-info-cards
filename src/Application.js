import Nullstack from 'nullstack';
import './Application.css';
import ChampionList from './ChampionList';
import ChampionDetails from './ChampionDetails';
import Header from './Header';

class Application extends Nullstack {

  static async start(context) {
    const project = context.project;
    project.name = 'League Info Cards';
    project.domain = 'codase.com.br';
    project.color = '#6B46C1';

    const {MongoClient} = await import('mongodb');
    const databaseClient = new MongoClient('mongodb://localhost:27017/');
    await databaseClient.connect();
    context.database = await databaseClient.db('league-info-cards');
    context.riotEndpoint = 'http://ddragon.leagueoflegends.com';
    const {readFileSync} = await import('fs');
    const data = readFileSync('versions.json', 'utf-8');
    context.versions = JSON.parse(data);
    await import('isomorphic-fetch');
  }

  initialize(context) {
    context.page.title = `${context.project.name}`;
    context.page.locale = "pt-BR";
  }

  static async loadInitialContext({database, versions}) {
    const version = versions[0];
    const champions = await database.collection("champions").find({version}).toArray();
    return {champions, versions, version};
  }

  async initiate(context) {
    const {champions, versions, version} = await this.loadInitialContext();
    context.versions = versions;
    context.version = version;
    context.champions = champions;
  }

  render({champions}) {
    return (
      <main class="sm-p10t sm-p2x md+p8t pt:p0t">
        <Header />
        {champions && <ChampionDetails route="/champions/:slug" />}
        <ChampionList route="/"/>
      </main>
    )
  }

}

export default Application;