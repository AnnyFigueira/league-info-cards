import Nullstack from 'nullstack';

class ChampionForm extends Nullstack {
  
  name = "";
  error = "";

  static async insert({database, name}) {
    if (!name) {
      return {error: "Name can't be blank"};
    };

    const taken = await database.collection("champions").findOne({name});
    if (taken) {
      return {error: "Champion already in the database"};
    };

    const slug = name.replace(/ /g,"").replace(/'/g,"");
    const data = await database.collection("champions").insertOne({name, slug});
    const _id = data.ops[0]._id;
    return {champion: {_id, name, slug}};
  }

  async save(context) {
    const {error, champion} = await this.insert({name: this.name});
    this.error = error;
    if (!error) { 
      context.champions = [...context.champions, champion]; 
      context.router.url = `/champion/${champion.slug}`;
    }

  }


  render() {
    return (
      <div>
        <form onsubmit={this.save}>
          <input type="text" bind="name" placeholder="New Champion Name" />
          <button> Save </button>
        </form>
      </div>
    )
  }

}

export default ChampionForm;