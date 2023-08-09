const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({Part}) => {
  console.log(Part)
  return (
    <p>
      {Part.title} {Part.exercises}
    </p>
  );
};

const Content = ({ Parts }) => {
  return (
    <>
      {Parts.map((part) => {
        return <Part Part={part} key={part.title} />;
      })}
    </>
  );
};

const Total = ({total}) => {
  let sum = 0;

  for (let part of total) {
    sum += part.exercises;
    console.log(part)
  }

  return <p>Number of exercises {sum}</p>;
};

function App() {
  const Course = {
    title: 'Half Stack application development',
    Parts: [
      { title: 'Fundamentals of React', exercises: 10 },
      { title: 'Using props to pass data', exercises: 7 },
      { title: 'State of a component', exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={Course.title} />
      <Content Parts={Course.Parts} />
      <Total total={Course.Parts} />
    </div>
  );
}

export default App;
