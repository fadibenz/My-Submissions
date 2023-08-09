const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content Parts={course.parts} />
      <Total total={course.parts} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h2>{course}</h2>;
};

const Part = ({ Part }) => {
  return (
    <p>
      {Part.name} {Part.exercises}
    </p>
  );
};

const Content = ({ Parts }) => {
  return (
    <>
      {Parts.map((part) => {
        return <Part Part={part} key={part.id} />;
      })}
    </>
  );
};

const Total = ({ total }) => {
  let sum = total.reduce((sum, part) => {
    return (sum += part.exercises);
  }, 0);

  return <p>Total of {sum}</p>;
};

function App() {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Web development Curicculum</h1>
      {courses.map((course) => {
        return <Course course={course} key={course.id}/>;
      })}
    </div>
  );
}

export default App;
