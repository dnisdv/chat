import styled from 'styled-components'
import {
    Form as AuthForm,
    FormInputWrapper as FormInputWrapperAuth
} from '../Auth.styled'

export const Wrapper = styled.div`
`

export const Form = styled(AuthForm)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-column-gap: 20px;
    justify-items: stretch;
    align-items: stretch;
`

export const FormInputWrapper = styled(FormInputWrapperAuth)`
    grid-column:1/3;
    &:first-child{
        grid-column:1/2
    };
    &:nth-child(2){
        grid-column:2/3
    }
`
