import React from 'react';
import './Content.css'; // Corrected import statement

function Content() {
  return (
    <>
    <div className='contentDiv'>
      <section>
        <h1>Angie Leong</h1>
        <h2>Welcome to my portfolio website!</h2>
        <blockquote>I like making stuff and trying out new things</blockquote>
      </section>

      <section>
        <p>I am from Macao</p>
        <p>In case you don't know where it is...</p>
        <p>It is a smaller version of Hong Kong and located right next to it</p>
        <p>(40 min bus / 1 hr boat)</p>
        <p>but also the Asian version of Vegas</p>
        <p>(3x it's revenue in 2023)</p>
      </section>

      <section>
        <p>I have 2 lovely cats</p>
        <p>1 named EggTart (named after one of my favorite snacks)</p>
        <p>borned in 2021, male, orange, fatty, smart</p>
        <p>another one named Truffie (named after my favorite 香料)</p>
        <p>borned in 2022, female, american short-hair, foodie</p>
      </section>

      <section>
        <p>I have an older brother so...</p>
        <p>I grow up gaming a looot of console games</p>
        <p>especially the Nintendos, I had NDSiXL, Wii, Switch</p> {/* Fixed closing tag */}
        <p>I was a real big fan of Lego and Gundam too</p>
        <p>but then I got really big into computers since 13</p>
      </section>

      <section>
        <p>Ah, yes</p>
        <p>before we start</p>
        <p>I have to mention that I like traveling</p>
        <p>now u can see where the theme for this website comes from XD</p>
      </section>

      <section>
        <section>
        <h1>Game Dev</h1>
        <p>I started doing game dev at age 13 with Unity</p>

          <section>
          <h2><strong>Tower Defense</strong></h2> {/* Use <strong> instead of <b> */}
          <p>I made a tower defense game with 3D assets I made</p>
          <p>which are some cute "bomb" mans and some castles</p>
          <p>I also made some really cool guns as towers to eliminate the bombs</p>
          </section>

          <section>
          <h2>??</h2>
          <p>I also made some infinite scrolling old-school shooting games</p>
          </section>

          <section>
          <h2><strong>Adventure game</strong></h2> {/* Use <strong> instead of <b> */}
          <p>Collaborated w\ my frd, we made an adventure game</p>
          <p>containing of 5 challenges, I created the character and the animation with Sprite</p>
          <p>including walking, jumping, attacking</p>
          <p>We also invented some really cool (difficult) mechanisms like invisible colliders, bombs so that you can jump</p>
          <p>which made our teacher really mad and deducted our points for poor game experience...</p>
          </section>

          <section>
          <h2>Maze game</h2>
          </section>
          
        </section>

        <section>
        <h1>Web Dev</h1>
        <p>again, at 12.5 yo, probs more accurately 7th grade</p>
        <p>I started coding HTML CSS on some random websites</p>
        <p>so that I won't get bored in class...</p>
        <p>am glad that I have never gotten caught</p>
          <section>
          <h1>This Portfolio</h1>

          <h1>Ascend Tech</h1>

          <h1>Secure Blox</h1>

          <h1>Puppod</h1>

          <h1>Solar Car Full Stack API</h1>

          <h1>Solar Car Web Simulator</h1>

          <h1>Marupo-eats</h1>
          </section>
        </section>
        </section>
      </div>
    </>
  );
}

export default Content;