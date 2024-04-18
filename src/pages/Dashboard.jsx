import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllDetalsAPI } from "../services/allAPI"



function Dashboard() {
  const [allDetails, setAllDetails] = useState([])
  console.log(allDetails);

  useEffect(() => {
    getAllDetails()
  }, [])

  const getAllDetails = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Beare ${token}`
    }
    try {
      const result = await getAllDetalsAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setAllDetails(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className='container'>
        <h3 className="text-center">Student Details</h3>
        <table className="table">
          <thead>
            <tr>
              <th style={{ color: 'white' }}>First name</th>
              <th style={{ color: 'white' }}>Last name</th>
              <th style={{ color: 'white' }}>Adress</th>
              <th style={{ color: 'white' }}>E mail</th>
              <th style={{ color: 'white' }}>Mobile</th>
              <th style={{ color: 'white' }}>DOB</th>
              <th style={{ color: 'white' }}>Gender</th>
              <th style={{ color: 'white' }}>Course</th>
            </tr>
          </thead>
          <tbody>


            {allDetails?.length > 0 ?
              allDetails?.map(details => (
                <tr key={details}>
                  <td style={{ color: 'white' }}>{details.firstname}</td>
                  <td style={{ color: 'white' }}>{details?.lastname}</td>
                  <td style={{ color: 'white' }}>{details?.adress}</td>
                  <td style={{ color: 'white' }}>{details?.email}</td>
                  <td style={{ color: 'white' }}>{details?.mobile}</td>
                  <td style={{ color: 'white' }}>{details?.dob}</td>
                  <td style={{ color: 'white' }}>{details?.gender}</td>
                  <td style={{ color: 'white' }}>{details?.course}</td>
                </tr>

              ))
              :
              <div className="fw-bolder text-danger m-5">Detials Not found!!!</div>
            }


          </tbody>
          <div>
            <Link to={'/'} style={{ textDecoration: 'none' }} className='fw-bolder btn btn-primary'>Back</Link>
          </div>
        </table>
      </div>
    </>
  )
}

export default Dashboard