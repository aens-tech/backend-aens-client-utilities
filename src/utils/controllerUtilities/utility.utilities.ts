import { INTERESTS, UTILITY_TYPES } from "@/enum/enumerators"
import { checkEnumMatchWithArray, checkEnumMatchWithString } from "../utils"

const isUtilityDataValid = (interests: string[], type: string, url: string) => {

    console.log(interests, type, url)

    if (Array.isArray(interests)){
            const areInterestsValid =  checkEnumMatchWithArray(interests, INTERESTS)
        
            if (!areInterestsValid) {
                return false
            }
    }

    if (typeof type === "string"){
        const isTypeValid = checkEnumMatchWithString(type, UTILITY_TYPES)
        console.log("type", type, UTILITY_TYPES)
        
        if (!isTypeValid) {
            console.log("Not valid type")
            return false
        }
        
        if (type === UTILITY_TYPES.DOWNLOAD){
            if (!url) {
                console.log("url", url)
                return false
            }
        }
    }

    console.log("Alright")
    return true
}

export default {
    isUtilityDataValid
}
