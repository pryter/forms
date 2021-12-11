import {gql} from "apollo-server-micro";

const typedefs = gql`
    
    type Response {
        status: Boolean,
        data: FormsStruct
    }
    
    type FormsStruct {
        content: String
    }

    type Query {
        getForm(id: String): Response
    }
    
    type Mutation {
        saveForm(id: String, content: String): Boolean
    }
`

export default typedefs
