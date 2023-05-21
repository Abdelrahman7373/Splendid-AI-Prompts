import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center"> Discover & Share <br className="max-md:hidden" /> <span className="orange_gradient text-center">Fantastic AI Prompts</span> </h1>
      <p className="desc text-center">Splendid AI Prompts is a website where people can discover, create and share creative prompts to get the best answer and result from any AI in the world</p>
      
      <Feed />
    </section>
  )
}

export default Home
