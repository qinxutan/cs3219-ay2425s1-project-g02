import MatchingOptions from "@/components/custom/MatchingOptions/MatchingOptions";
import QuestionTable from "@/components/custom/QuestionTable/QuestionTable";
import { Separator } from "@/components/ui/separator";
import { Title } from "@/components/ui/title";
import "@/css/styles.css";
import { useNavigate } from "react-router-dom";

function HomePageView() {
  const navigate = useNavigate();

  return (
    <main className="h-screen w-screen p-5">
      <div className="mb-4">
        <Title title="Question Bank" />
        <Separator className="my-2" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 p-4 rounded-lg shadow-lg">
          <QuestionTable />
        </div>

        <div className="col-span-1 p-4 rounded-lg shadow-lg">
          <MatchingOptions />
        </div>
      </div>
    </main>
  );
}

export default HomePageView;
