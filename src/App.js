import React, {useState, createRef} from 'react'
import {Grid, Segment, Header, Button, Icon, Ref, Sticky, Modal, Image, Label, Divider} from 'semantic-ui-react'
import * as R from 'ramda'
import './index.css'

//name of the array is pokemon
import pokemon from './pokemonDatabase.json'
// Define a function that returns a pokemon give pokedex_number, if true will return the desiredPokemon
const getPokemon = desiredPokedexNumber => {
  //Have to assign function to a const to use with another input later on (curry)
  const isDesiredPokemon = R.propEq("pokedex_number", desiredPokedexNumber)
  return R.find(isDesiredPokemon)(pokemon)
}
//To git push, you have to add the files to your local repository (git add .) or (git add _fileName_), 
//and then commit them (git commit -m "message"). Then PUSH THEM to your github to your desired branch (git push origin _branchName_)




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
  //destructuring objects in the curly braces
  //curly braces defines the object
  const teamMemberSegment = ({name, pokedex_number, classfication}) => (
  
    //if you iterate in react, each component needs a unique key
    <Segment key={pokedex_number} className='segment'>
      {name}
      <Button floated='right' size="small" labelPosition='right'
        onClick={
        (event, data) => {
          let index = R.indexOf(pokedex_number, team)
          // only possible because setTeam is in scope already
          // otherwise would need to pass as component prop
          setTeam(R.remove(index, 1, team))
        }
      }>
        <Icon name='close' />
      </Button>
    </Segment>
  )

  const contextRef = createRef()
  return (
    <Grid>
      <Ref innerRef={contextRef}>
      <Grid.Row>
        <Grid.Column width={10}>
          <Segment basic className='segment'>
          {
            R.map(
              ({name, pokedex_number, classfication, type1, type2, entry}) => (
                <Segment key={pokedex_number} basic>
                  <Segment attached>
                    <Header >
                      <Image circular src={require(`./sprites/${pokedex_number}.png`)}/>
                      {`${name}`}
                      <Divider horizontal hidden />
                      <Header.Subheader>
                        <Label.Group>
                          <Label content='No.' detail={pokedex_number} />
                          <Label content='Type 1:' detail={type1} />
                          {
                            //if truthy value then it will render the Label content
                            type2 && <Label content='Type 2' detail={type2} />
                          }
                        </Label.Group>
                      </Header.Subheader>
                    </Header>
                  </Segment>
                  <Button.Group attached="bottom">
                  const infoModal = () => (
                    <Modal trigger = {<Button>Info</Button>} >
                      <Modal.Header>{name}</Modal.Header>
                      <Modal.Content image >
                        {/* To access the images dynamically, have a property that you pass in that's the same as the name */}
                        <Image width="70" height="70" src={require(`./sprites/${pokedex_number}.png`)}/>
                        <Modal.Description>
                          <p>{`The ${classfication}`}</p>
                          <p>{`${entry}`}</p>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
}
                  )
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
          <Sticky context={contextRef}>
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
          </Sticky>
        </Grid.Column>
      </Grid.Row>
      </Ref>
    </Grid>
  )
}

export default App;
