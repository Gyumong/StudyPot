import {AuthTemplateBlock} from "./styles";
import StudyCard from "@components/StudyCard";
import {GridBox} from "./styles";
import MainSelect from "@components/MainSelect";

const FindStudy = () => {
 
    return (
       <AuthTemplateBlock>
           <MainSelect/>
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