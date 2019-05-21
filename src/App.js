import React, {useState} from 'react'
import {Grid, Segment, Header, Button} from 'semantic-ui-react'
import * as R from 'ramda'

//name of the array is pokemon
import pokemon from './pokemonDatabase.json'
// Define a function that returns a pokemon give pokedex_number, if true will return the desiredPokemon
const getPokemon = desiredPokedexNumber => {
  //Have to assign function to a const to use with another input later on (curry)
  const isDesiredPokemon = R.propEq("pokedex_number", desiredPokedexNumber)
  return R.find(isDesiredPokemon)(pokemon)
}

//destructuring objects in the curly braces
//curly braces defines the object
const teamMemberSegment = ({name, pokedex_number}) => (
  //if you iterate in react, each component needs a unique key
  <Segment key={pokedex_number}>
    {name}
  </Segment>
)


function App() {
  // You have to use react state in a component
  // team: the state variable
  // setTeam: the function that assigns the value to team
  // [stateVariableName, setStateVariableName]
  // team: array of pokedex_number
  const [team, setTeam] = useState([])
  // isTeamFull: [] => Bool
  //compose is f(g(x)) => r.equals(6)(R.length(x))
  //do the function inside first then apply it to function f
  //Ramda will automatically curry
  const isTeamNotFull = R.compose(
    R.not,
    R.equals(6),
    R.length
  )
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <Segment basic>
          {
            R.map(
              ({name, pokedex_number}) => (
                <Segment key={pokedex_number} basic>
                  <Segment attached>
                    <Header content={`${pokedex_number} ${name}`} />
                  </Segment>
                  <Button.Group attached="bottom">
                    <Button>Info</Button>
                    <Button content="Add to team"
                      onClick={
                        (event, data) => {
                          console.log(event, data)
                          if (isTeamNotFull(team)) {
                            setTeam(R.append(pokedex_number, team))
                          }
                        }
                      }

                    />
                  </Button.Group>
                </Segment>
              ),
              pokemon
            )
          }
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment basic>
            <Segment.Group>
              {
                R.compose(
                  //map applies a function every element in the array and returns the transformed array (not mutated)
                  R.map(teamMemberSegment),
                  R.map(getPokemon)
                )(team)
              }
              {/* {JSON.stringify(team)} */}
            </Segment.Group>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default App;
