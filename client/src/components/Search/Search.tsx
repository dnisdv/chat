import React from 'react'
import {Wrapper, SearchInput, SearchIMG,CloseIMG, CloseIMGWrapper} from './Search.styled'
import SearchIcon from './Assets/search.svg'
import CloseIcon from './Assets/close.svg'


export type SearchProps = {
    SearchInputRef:React.MutableRefObject<HTMLInputElement | null>,
    searchValue:string,
    changeValue:(e:React.ChangeEvent<HTMLInputElement>) => void,
    clearSearchValue:() => void
}

const Search = ({
    SearchInputRef,
    searchValue,
    changeValue,
    clearSearchValue
}:SearchProps) => {
    return(
        <Wrapper>
            <SearchInput 
                ref={SearchInputRef} 
                value={searchValue} 
                onChange={changeValue} 
                type="text" 
                placeholder="Search for friends"
            />
            {searchValue.length >= 1 ? 
                <CloseIMGWrapper onClick={clearSearchValue}><CloseIMG src={CloseIcon} alt="close" /></CloseIMGWrapper>
                : <SearchIMG src={SearchIcon} alt="search" />
            }
            
        </Wrapper>
    )
}

export default Search