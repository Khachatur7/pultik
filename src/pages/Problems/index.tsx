import { AuthCheck, Container } from "@/components";
import axios from "@/axios";
import { useEffect, useState } from "react";

interface Problems {
  problemsDb: Problem[];
}

interface Problem {
  problem: string;
  _id: string;
}

const ProblemsPage = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [text, setText] = useState<string>("");
  const GetProblems = async () => {
    try {
      const res = await axios.post<Problems>("/getProblemsData", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status == 200) {
        setProblems(res.data.problemsDb);
      }

      console.log(res.data.problemsDb);
    } catch (error) {
      throw new Error(`ошибка при получении данных`);
    }
  };

  const createProblem = async () => {
    if (text) {
      try {
        const res = await axios.post<{ succses: boolean; text: string }>(
          "/sendProblemsData",
          {
            user: localStorage.getItem("pultik-user-login"),
            text: text,
          }
        );

        if (res.status == 200) {
          GetProblems();
          setText("")
          alert(res.data.text);
        }
      } catch (error) {
        throw new Error(`ошибка при отправке данных`);
      }
    }
  };

  useEffect(() => {
    GetProblems();
  }, []);

  return (
    <AuthCheck>
      <Container>
        <div className="problems_wrapper">
          <div className="problems_content">
            <div className="problems_list">
              {problems.map((p, ind) => {
                return (
                  <div className="problem" key={p._id}>
                    <span>{ind + 1}.</span>
                    {p.problem}
                  </div>
                );
              })}
            </div>
            <div className="post_problem">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button className="post_problem__btn" onClick={createProblem}>
                Добавить
              </button>
            </div>
          </div>
        </div>
      </Container>
    </AuthCheck>
  );
};

export default ProblemsPage;
