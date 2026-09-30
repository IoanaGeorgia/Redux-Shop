
function Loading({ size = 'default' }) {

  if (size === "md") {
    return (
      <div className='loading md'> Loading... </div>
    )
  }
  if (size === "sm") {
    return (
      <div className='loading sm'> Loading... </div>
    )
  }
  else {
    return (
      <div className='loading'> Loading... </div>

    );
  }


}

export default Loading;
