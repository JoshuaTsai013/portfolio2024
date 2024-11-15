import styles from './parallax.module.css';
function Parallex() {
  return (
    <div className="h-screen w-full relative left-0 top-0" >

      {/* <div className={styles.parallax_layer} >
        <h1 style={{ marginTop: '500px' }}>-WELCOME-</h1>
        {[...Array(20)].map((_, index) => (
          <h1 key={index} style={{ width: '400px', marginTop: '20px', marginLeft: `${100 + index * 100}px` }}>-WELCOME-</h1>
        ))}
      </div> */}
      <div className={styles.backgroundUp} ></div>
      <div className={styles.star}></div>
      <div className={styles.sun}></div>
      <div className={styles.backgroundDown} ></div>
      <div className={styles.grid} ></div>
    </div>
  );
}

export default Parallex;