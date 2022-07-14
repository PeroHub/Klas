import React, { useState, useEffect } from "react"
import axios from "axios"
import styles from  './Datagrid.module.css'
import  Pagination  from "./Pagination"
//An array of
// Id
//first name
//last name
// amount paid
// sort by paid, cancel, pending
// interface Pro {
//     id: number, firstName: string, lastName: string, status: string
// }
// const product: Pro[] = [
//     {
//         id: 1,
//         firstName: "Peter",
//         lastName: "ime",
//         status: "paid"

//     },
//     {
//         id: 2,
//         firstName: "eba",
//         lastName: "joe",
//         status: "paid"

//     },
//     {
//         id: 3,
//         firstName: "aboy",
//         lastName: "stephen",
//         status: "cancel"

//     },
//     {
//         id: 4,
//         firstName: "Sam",
//         lastName: "Dege",
//         status: "cancel"

//     }, 
//     {
//         id: 5,
//         firstName: "ebe",
//         lastName: "me",
//         status: "pending"

//     },
//     {
//         id: 6,
//         firstName: "aba",
//         lastName: "them",
//         status: "pending"

//     },
//     {
//         id: 7,
//         firstName: "Jack",
//         lastName: "Essien",
//         status: "pending"

//     },
//     {
//         id: 8,
//         firstName: "Mendie",
//         lastName: "usen",
//         status: "pending"

//     },
//     {
//         id: 9,
//         firstName: "Blessing",
//         lastName: "Aba",
//         status: "pending"

//     },
//     {
//         id: 10,
//         firstName: "Micheal",
//         lastName: "Udo",
//         status: "pending"

//     },
//     {
//         id: 11,
//         firstName: "Jacob",
//         lastName: "isaac",
//         status: "pending"

//     },
//     {
//         id: 12,
//         firstName: "Ekong",
//         lastName: "Ubong",
//         status: "pending"

//     },
// ]


const  Datagrid = () => {
    const [data, setData] = useState<any>([{}])
    const [ product, setProduct ] = useState<any>([{}])
    const [ option, setOption ] = useState("")
    
    
    const [ loading, setLoading ] = useState(false)
    const [ userInput, setUserInput ] = useState({
        firstname: "",
        lastname: "",
        gender: ""
    })

    console.log(userInput)


    useEffect(() => {
        const apiCall = async() => {
            try {
                setLoading(true)
                await axios.get('http://localhost:8080/')
                .then(res => {
                    
                    setData(res.data.data)
                    setProduct(res.data.data)
                    setLoading(false)
                }) 
                
            } catch (error) {
                console.error(error)
                setLoading(false)
            }

        }

        apiCall()
    }, [])


    //Pagination
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ dataPerPage] = useState(15)
    // console.log(userInput)

    const handleSort = (e: any) => {
        // setData(data)
        console.log(e.target.value)
        if(e.target.value === ""){
            setData(product)
        }else {
            let sortP = product.filter((item: any) => item.gender === e.target.value)
            console.log(sortP)
            setData(sortP)
        }
    }
 
    

    const handleDel = (id: any) => {
        console.log(id)
        setData((items: any) => items.filter((_: any, i: any) => i !== id))
       
    }

    const handleSaveInput = (e: any, item: any, index: number) => {
        const test = data
        // if(e.key === 'Enter'){
            test[index] = {...test[index],[e.target.name]:e.target.value}
            setData([...test])
            console.log(e.target.name,"=====> value")
            console.log(test)
        // }
        
        
    }

    


    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const currentData = Array.from(data)?.slice(indexOfFirstData, indexOfLastData)

    const paginate = (number: number) => setCurrentPage(number)
   
    
    return (
        <div className={styles.container}>
            <div className={styles.option}>
                <span style={{color: "#6b7280", marginRight: "5px", marginTop: "10px"}}>Sort</span>
                <select name="" id=""  className={`${styles.classic} ${styles.select}`}
                onChange={(e) => {
                    setOption(e.target.value)
                    handleSort(e)
                    }} value={option}>
                    <option value="" >All</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    
                    
                </select>
            </div>
            <div className={styles.header}>
                <div className={styles.Id}>ID</div>
                <div className={styles.firstName}>First Namee</div>
                <div className={styles.lastName}>Last Name</div>
                <div className={styles.status}>Status</div> 
                <div className={styles.action}>Action</div> 
            </div>
            <div>
                {loading ? "loading...":   <div>
                    {currentData?.map((item: any, index: any) => (
                        
                        <div className={styles.headerInput} key={item.id} >
                            <div className={styles.cellInput1}>
                                <input defaultValue={item.id} disabled />
                            </div>
                            <div className={styles.cellInput2}>
                                <input 
                                    defaultValue={item.firstname} 
                                    onChange={(e) => {
                                        setUserInput((values) => ({...values, [e.target.name]: e.target.value}))
                                        
                                    }} 
                                    onBlur={(e) => {
                                        handleSaveInput(e, item, index)
                                    }}
                                    name="firstname" />
                            </div>
                            <div className={styles.cellInput3}>
                                <input 
                                    defaultValue={item.lastname} 
                                    onChange={(e) => {
                                        setUserInput((values) => ({...values, [e.target.name]: e.target.value}))
                                       
                                    }} 
                                    onKeyDown={(e) => {
                                        handleSaveInput(e, item, index)
                                    }}
                                    name="lastname" />
                            </div>
                            <div className={styles.cellInput4}>
                                <input 
                                    defaultValue={item.gender} 
                                    onChange={(e) => {
                                        setUserInput((values) => ({...values, [e.target.name]: e.target.value}))
                                        
                                    }} 
                                    onKeyDown={(e) => {
                                        handleSaveInput(e, item, index)
                                    }} 
                                    name="gender" />
                            </div>
                            <div className={styles.cellInput5} onClick={() => handleDel(index)}>
                            <button style={{width: "100%", height: "100%", background: "#2dd4bf", color: "#fff", border: "none", cursor: "pointer"}}>Del</button>
                            </div>
                        </div>
                        ))}
            </div>}
            </div>
           

            <Pagination dataPerPage={dataPerPage} total={100000} paginate={paginate} />
        </div>
    )
}

export default Datagrid