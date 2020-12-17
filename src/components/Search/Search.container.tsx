import React,{useState, useRef} from 'react'
import SearchComponent,{ SearchProps} from './Search'


type SearchContainerProps = {
    onChange?:(value:string) => void,
}

const Search = ({onChange}: SearchContainerProps) => {
    const [searchValue, setSearchValue] = useState<string>("")
    const SearchInputRef = useRef<HTMLInputElement | null>(null)

    const changeValue = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        onChange && onChange(e.target.value)
        console.log("SEARCH FOR USERS")
    }

    const clearSearchValue = () => {
        setSearchValue("");
        onChange && onChange("")
        SearchInputRef && SearchInputRef.current?.focus()
    } 
    
    return(
        <SearchComponent 
            SearchInputRef={SearchInputRef}
            searchValue={searchValue}
            changeValue={changeValue}
            clearSearchValue={clearSearchValue}
            />
    )
}

export default Search