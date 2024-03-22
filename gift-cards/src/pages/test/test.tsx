import { useState, useEffect, SetStateAction } from 'react';
import axios from 'axios';
import { Card, Input } from 'semantic-ui-react'
export default function Posts() {
    const [APIData, setAPIData] = useState([] as any[])
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([] as any[]);
    
    useEffect(() => {
        axios.get(`https://bn.glassmountainbpo.com:8080/api/users`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

  //   const searchItems = (searchValue: any) => {
  //     setSearchInput(searchValue);
  //     if (searchInput !== '') {
  //     const filteredData = APIData.filter((item) => {
  //       return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
  //     })
  //     setFilteredResults(filteredData);
  //   }
  //   else{
  //     setFilteredResults(APIData);
  //   }
  // }

      const onChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchInput(e.target.value)
      };

      useEffect(() => {
        if (searchInput !== '') {
          const filteredData = APIData.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
          })
          setFilteredResults(filteredData);
        }
        else {
          setFilteredResults(APIData);
        }
      }, [searchInput]);

    return (
        <div style={{ padding: 20 }}>
            <Input icon='search'
                placeholder='Search...'
                // onChange={(e) => searchItems(e.target.value)}
                onChange={onChange}
            />
            <Card.Group style={{ marginTop: 20 }}>
              {searchInput.length > 1 ? (
                filteredResults.map((item) => {
                  return (
                    <Card>
                        <Card.Content>
                        <Card.Header className='text-white'>{item.badge}</Card.Header>
                                <Card.Description className='text-white'>
                                    {item.username}
                                    {item.id_rol}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                  )
                })
              ): (
                APIData.map((item) => {
                    return (
                        <Card>
                            <Card.Content>
                                <Card.Header className='text-white'>{item.badge}</Card.Header>
                                <Card.Description className='text-white'>
                                    {item.username}
                                    {item.id_rol}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )
                })
              )}
            </Card.Group>
        </div>
    )
};