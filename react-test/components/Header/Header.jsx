import {useEffect, useState, useRef} from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa'
import { Container, Label, IconWrapper, SearchInput } from './Header.styles';

const Header = (props) => {
  const searchInputRef = useRef(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    const inputValue = searchInputRef.current.value;
    if(inputValue.length >= 3) {
      console.log(`fetch data from ${inputValue}`);
      const API_KEY = '276903768153e6bb93a7711470e97109';
      const HASH = 'b377f9b70336abc5319f057b032fb63e';
      const URL = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${API_KEY}&hash=${HASH}`;
      const fetchData = async (endpoint, value = '') => {
        const request = await fetch(`${endpoint}&nameStartsWith=${value}`);
        const response = await request.json();
        console.log('🚀 ~ response', response.data.results);
        setSearchResults(response.data.results);
      }

      fetchData(URL, inputValue);
    }
  }

  return (
    <Container>
      <Image src="/marvel-logo.svg" alt="" width={100} height={36}/>
      <Label>
        <IconWrapper><FaSearch/></IconWrapper>
        <SearchInput type="search" placeholder="Search" ariaAutocomplete="list" value={searchInput} onChange={(e) => handleInputChange(e)} ref={searchInputRef} />
      </Label>
    </Container>
  );
}


export default Header;
