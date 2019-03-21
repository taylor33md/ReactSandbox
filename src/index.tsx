import * as React from "react";
import { render } from "react-dom";

interface ITrackingProps {
  title?: string;
}

interface ICharacter {
  name: string;
  initative: number;
}

interface ITrackingState {
  characters: ICharacter[];
  position: number;
}

class Tracking extends React.Component<ITrackingProps, ITrackingState> {
  constructor(props: ITrackingProps) {
    super(props);

    this.state = {
      characters: [
        {
          name: "Zephyr",
          initative: 24
        },
        {
          name: "Hu",
          initative: 16
        },
        {
          name: "Xaldor",
          initative: 5
        },
        {
          name: "Glim",
          initative: 12
        }
      ],
      position: 0
    };
  }

  private handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {};

  private handleNextClick = () => {
    this.setState({
      position: ++this.state.position % this.state.characters.length
    });
  };

  public render() {
    const { title } = this.props;
    const { characters, position } = this.state;

    const orderedCharacters = characters.sort(
      (a: ICharacter, b: ICharacter) => {
        return b.initative - a.initative;
      }
    );

    let initativeList: JSX.Element[] = [];
    for (var i = 0; i < orderedCharacters.length; ++i) {
      let orderedCharacterPositionIndex =
        (i + position) % orderedCharacters.length;
      initativeList.push(
        <div>
          {orderedCharacters[orderedCharacterPositionIndex].name} (
          {orderedCharacters[orderedCharacterPositionIndex].initative})
        </div>
      );
    }

    return (
      <>
        <h1>{title ? title : "Tracking Order"}</h1>
        <p>{"Enter your initiative: "}</p>
        <input type="text" />
        {initativeList}
        <button onClick={this.handleNextClick}>Next</button>
      </>
    );
  }
}

render(<Tracking />, document.getElementById("root"));
