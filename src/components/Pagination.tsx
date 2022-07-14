import React from 'react'
import styles from './Pagination.module.css'

const Pagination = (props: any) => {
    console.log(props)
    const pageNumber = []
    for(let i = 1; i <= Math.ceil(props.total / props.dataPerPage); i++){
        pageNumber.push(i)
    }
  return (
    <div className={styles.container}>
        
            {pageNumber.map(number => (
                <span key={number} className={styles.number}>
                    <span className={styles.text}  onClick={() => props.paginate(number)} style={{color: "black"}}>
                        {number}
                    </span>
                </span>
            ))}
       
    </div>
  )
}

export default Pagination
