export interface ErrorInput {
    name: boolean
    email: boolean
    tel: boolean
    date:boolean
  }  


export interface ErrorProps {
    setError: React.Dispatch<ErrorInput>
    error: ErrorInput
}