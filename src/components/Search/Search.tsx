import {useState, useRef} from "react"
import {Wrapper, SearchInput, SearchIMG,CloseIMG, CloseIMGWrapper} from './Search.styled'
import SearchIcon from './Assets/search.svg'
import CloseIcon from './Assets/close.svg'


export type SearchProps = {
    onChange?:(value:string) => void
}

const Search = ({onChange}:SearchProps) => {
    const [searchValue, setSearchValue] = useState<string>("")
    const SearchInputRef = useRef<HTMLInputElement | null>(null)

    const changeValue = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        onChange && onChange(e.target.value)
    }

    const clearSearchValue = () => {
        setSearchValue("");
        onChange && onChange("")
        SearchInputRef && SearchInputRef.current?.focus()
    } 
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