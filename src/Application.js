import Nullstack from 'nullstack';
import './Application.css';
import ChampionList from './ChampionList';
import ChampionDetails from './ChampionDetails';

class Application extends Nullstack {

  static async start(context) {
    const project = context.project;
    project.name = "League Info Cards";
    project.domain = "codase.com.br";
    project.color = "#6B46C1";

    const {MongoClient} = await import('mongodb');
    const databaseClient = new MongoClient('mongodb://localhost:27017/');
    await databaseClient.connect();
    context.database = await databaseClient.db('league-info-cards');
  }

  initialize(context) {
    context.page.title = `${context.project.name}`;
    context.page.locale = "pt-BR";
  }

  static async findChampions({database}) {
    return await database.collection("champions").find().toArray();
  }

  async initiate(context) {
    context.champions = await this.findChampions();
  }

  render({champions}) {
    return (
      <main>
        {champions && <ChampionDetails route="/champions/:slug" />}
        <ChampionList route="/"/>
      </main>
    )
  }

}

export default Application;