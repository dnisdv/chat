import React,{useState, useRef, useEffect} from 'react'
import SearchComponent from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { searchDialogs, clearFoundDialogs } from '../../redux/dialogs/actions'
import { DialogState } from '../../redux/dialogs/types'


const Search = () => {
    const [searchValue, setSearchValue] = useState<string>("")
    const SearchInputRef = useRef<HTMLInputElement | null>(null)
    const dispatch = useDispatch()
    const SelectedUser = useSelector( (state:{dialog: DialogState}) => state.dialog.selectedUser)

    useEffect(() => {
        setSearchValue("")
    }, [SelectedUser])
    
    const onUserSearch = (value:string) => {
        if(value !== ""){
            dispatch(searchDialogs(value))
        }else{
            dispatch(clearFoundDialogs())
            setSearchValue("")
        }
    }

    const changeValue = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        onUserSearch(e.target.value)
    }

    const clearSearchValue = () => {
        setSearchValue("");
        onUserSearch("")
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