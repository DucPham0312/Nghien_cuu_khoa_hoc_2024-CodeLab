import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageNotFound } from "../pages/page-error/PageNotFound";
import { HomePage } from "../pages/Home";
import { ComingSoon } from "../pages/page-error/ComingSoon";
import { StudyPlant } from "../pages//study-plan/StudyPlant";
import { FrontEnd } from "../pages//study-plan/StudyFrontend";
import { BackEnd } from "../pages/personal/StudyBackEnd";
import { Blog } from "../pages/blog/Blog";
import { Courses } from "../pages/courses/Courses";
import { FlashCard } from "../pages/flash-card/FlashCard";
import { QuestionFlashCard } from "../pages/flashcard/FormFlashCard";
import { Login } from "../pages/auth/Login";
import { SignUp } from "../pages/auth/SingUp";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { DetailsCourse } from "../pages/courses/DetailsCourse";
import { FormStudy } from "../pages/formstudy/FormStudy";
import { Practice } from "../pages/practice/FormPractice";
import { Product } from "../pages/product/Product";
import { FormBlog } from "../pages/formblog/FormBlog";
import { Personal } from "../pages/personal/Personal";
import CreateBlog from "../pages/blog/CreateBlog";
import { Profile } from "../pages/profile/Profile";

const MyRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path="/studyplant" element={<StudyPlant />}></Route>
      <Route path="/studyplant/frontEnd" element={<FrontEnd />}></Route>
      <Route path="/studyplant/backEnd" element={<BackEnd />}></Route>
      <Route path="/blog" element={<Blog />}></Route>
      <Route path="/create-blog" element={<CreateBlog />}></Route>
      <Route path="/courses" element={<Courses />}></Route>
      <Route path="/courses/details-course" element={<DetailsCourse />}></Route>
      <Route path="/courses/form-practice" element={<Practice />}></Route>
      <Route path="/courses/form-study" element={<FormStudy />}></Route>
      <Route path="/courses/form-blog" element={<FormBlog />}></Route>
      <Route path="/courses/form-blog/*" element={<FormBlog />}></Route>
      <Route path="/flashcard" element={<FlashCard />}></Route>
      <Route path="/labcode" element={<ComingSoon />}></Route>
      <Route path="/link" element={<Product />}></Route>
      <Route path="/user" element={<ComingSoon />}></Route>
      <Route path="/mycourses" element={<ComingSoon />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/resetpassword" element={<ResetPassword />}></Route>
      <Route
        path="/studyplant/frontEnd/flashcard_htmlcss"
        element={<QuestionFlashCard />}
      ></Route>
      <Route
        path="/studyplant/frontEnd/flashcard_reactjs"
        element={<QuestionFlashCard />}
      ></Route>
      <Route
        path="/studyplant/frontEnd/flashcard_javascript"
        element={<QuestionFlashCard />}
      ></Route>
      <Route path="/personal" element={<Personal />}></Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MyRoute;
