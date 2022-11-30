import React from 'react';

const SectionTitle = (props) => {
  return (
    <div className="container text-center text-white mt-18 border-solid border-b-2 border-b-slate-100 p-4">
      <h1 className="xs:text-2xl sm:text-6xl font-bold mb-4">{props.title}</h1>
      <p className="font-light uppercase xs:text-xl sm:text-2xl">{props.description}</p>
    </div>
  );
};

export default SectionTitle;
