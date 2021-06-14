import {AuthTemplateBlock} from "./styles";
import StudyCard from "@components/StudyCard"
import {GridBox} from "./styles"

const FindStudy = () => {
 
    return (
       <AuthTemplateBlock>
           <GridBox>
                <StudyCard/>
                <StudyCard/>
                <StudyCard/>
                <StudyCard/>
                <StudyCard/>
                <StudyCard/>
                <StudyCard/>
           </GridBox>
       </AuthTemplateBlock>
    )
};

export default FindStudy;
