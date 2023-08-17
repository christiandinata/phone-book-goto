import { useQuery } from "@apollo/client";
import { useContext, useEffect } from "react";
import { ContactContext } from "../../context/ContactContext";
import { GET_CONTACT_LIST } from "../../queries/Contact";
import { ContactContextType } from "../../types/ContactType"
import { Button, Inner, Left, PageWrapper, Right } from "./Pagination.styles";

const Pagination: React.FC = () => {
  // import needed values from react context
  const {totalContacts, currOffset, currPage, setCurrOffset, setCurrPage, favoriteId} = useContext(ContactContext) as ContactContextType;

  const totalPage = totalContacts ? Math.ceil(totalContacts?.length / 10) : 1;

  const {fetchMore} = useQuery(GET_CONTACT_LIST, {
    variables: { 
      "limit": 10, 
      "offset": currOffset, 
      "order_by": {
        "first_name": "asc"
      },
      "where":  {
        "id": {
            "_nin": favoriteId
        }
      }
    }
  })

  // create 'select' component range
  const range = Array.from(Array(totalPage).keys()).map(idx => idx + 1);

  const prevPage = () => {
    if (currPage == 1){
      setCurrPage(currPage)
    }else{
      setCurrPage(currPage-1)
    }
    
  }

  const nextPage = () => {
    if (currPage == totalPage){
      setCurrPage(currPage)
    }else{
      setCurrPage(currPage+1)
    }
  }

  // trigger when the currPage variable changes
  useEffect(() => {
    setCurrOffset((currPage-1)*10)
    fetchMore({
      variables: {
        "limit": 10, 
        "offset": (currPage-1)*10, 
        "order_by": {
          "first_name": "asc"
        },
        "where":  {
          "id": {
              "_nin": favoriteId
          }
        }
      },
    })
  }, [currPage])
  

  return (
    <PageWrapper>
      <Inner>
        <Button id="left" aria-label="left" onClick={prevPage}>
          <Left />
        </Button>
          {currPage}
        <p>of</p>
          {totalPage}
        <Button id="right" aria-label="right" onClick={nextPage}>
          <Right />
        </Button>
      </Inner>
      <select value={currPage} onChange={(event) => setCurrPage(parseInt(event.target.value))}>
        {range?.map((idx, key) => {
            return(
                <option key={key} value={idx}>{idx}</option>
            )
        })}
      </select>
    </PageWrapper>
  )
}

export default Pagination