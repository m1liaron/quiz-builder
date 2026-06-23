import { Formik, Form, Field, FieldArray } from "formik";
import { useNavigate } from "react-router-dom";
import { quizApi } from "../../api/QuizApi";
import { QuestionTypes, type QuestionType } from "../../common/types/QuestionType";
import type { QuizForm } from "../../common/types/CreateQuizDTO.type";

export default function CreateQuizPage() {
  const navigate = useNavigate();

  const initialValues: QuizForm = {
    title: "",
    userId: "TEMP_USER_ID", // replace with auth later
    questions: [],
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card p-4 shadow">
            <h3 className="mb-4">Create Quiz</h3>

            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                await quizApi.createQuiz(values);
                navigate("/");
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  {/* TITLE */}
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <Field name="title" className="form-control" />
                  </div>

                  {/* QUESTIONS */}
                  <FieldArray name="questions">
                    {({ push, remove }) => (
                      <div>
                        <div className="d-flex justify-content-between mb-3">
                          <h5>Questions</h5>

                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                              push({
                                text: "",
                                type: QuestionTypes.INPUT,
                                correctAnswer: "",
                              })
                            }
                          >
                            + Add Question
                          </button>
                        </div>

                        {values.questions.map((q, index) => (
                          <div key={index} className="border p-3 rounded mb-3">
                            {/* TEXT */}
                            <div className="mb-2">
                              <label className="form-label">Question</label>
                              <Field
                                name={`questions.${index}.text`}
                                className="form-control"
                              />
                            </div>

                            {/* TYPE */}
                            <div className="mb-3">
                              <label className="form-label">Type</label>
                              <select
                                className="form-select"
                                value={q.type}
                                onChange={(e) => {
                                  const type = e.target.value as QuestionType;

                                  if (type === QuestionTypes.INPUT) {
                                    setFieldValue(`questions.${index}`, {
                                      text: q.text,
                                      type,
                                      correctAnswer: "",
                                    });
                                  }

                                  if (type === QuestionTypes.BOOLEAN) {
                                    setFieldValue(`questions.${index}`, {
                                      text: q.text,
                                      type,
                                      options: [
                                        { text: "True", isCorrect: true },
                                        { text: "False", isCorrect: false },
                                      ],
                                    });
                                  }

                                  if (type === QuestionTypes.CHECKBOX) {
                                    setFieldValue(`questions.${index}`, {
                                      text: q.text,
                                      type,
                                      options: [],
                                    });
                                  }
                                }}
                              >
                                <option value={QuestionTypes.INPUT}>Input</option>
                                <option value={QuestionTypes.BOOLEAN}>Boolean</option>
                                <option value={QuestionTypes.CHECKBOX}>
                                  Checkbox
                                </option>
                              </select>
                            </div>

                            {/* INPUT */}
                            {q.type === QuestionTypes.INPUT && (
                              <div className="mb-3">
                                <label className="form-label">
                                  Correct Answer
                                </label>
                                <Field
                                  name={`questions.${index}.correctAnswer`}
                                  className="form-control"
                                />
                              </div>
                            )}

                            {/* BOOLEAN */}
                            {q.type === QuestionTypes.BOOLEAN && (
                              <div className="mb-3">
                                <label className="form-label">
                                  Correct Answer
                                </label>

                                <div className="form-check">
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    checked={q.options?.[0]?.isCorrect === true}
                                    onChange={() =>
                                      setFieldValue(
                                        `questions.${index}.options`,
                                        [
                                          { text: "True", isCorrect: true },
                                          { text: "False", isCorrect: false },
                                        ]
                                      )
                                    }
                                  />
                                  <label className="form-check-label">True</label>
                                </div>

                                <div className="form-check">
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    checked={q.options?.[1]?.isCorrect === true}
                                    onChange={() =>
                                      setFieldValue(
                                        `questions.${index}.options`,
                                        [
                                          { text: "True", isCorrect: false },
                                          { text: "False", isCorrect: true },
                                        ]
                                      )
                                    }
                                  />
                                  <label className="form-check-label">False</label>
                                </div>
                              </div>
                            )}

                            {/* CHECKBOX */}
                            {q.type === QuestionTypes.CHECKBOX && (
                              <FieldArray
                                name={`questions.${index}.options`}
                              >
                                {({ push, remove }) => (
                                  <div>
                                    <label className="form-label">
                                      Options
                                    </label>

                                    {q.options?.map((opt, optIndex) => (
                                      <div
                                        key={optIndex}
                                        className="d-flex gap-2 mb-2"
                                      >
                                        <Field
                                          name={`questions.${index}.options.${optIndex}.text`}
                                          className="form-control"
                                          placeholder="Option text"
                                        />

                                        <div className="form-check mt-2">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={opt.isCorrect}
                                            onChange={(e) =>
                                              setFieldValue(
                                                `questions.${index}.options.${optIndex}.isCorrect`,
                                                e.target.checked
                                              )
                                            }
                                          />
                                        </div>

                                        <button
                                          type="button"
                                          className="btn btn-danger btn-sm"
                                          onClick={() => remove(optIndex)}
                                        >
                                          X
                                        </button>
                                      </div>
                                    ))}

                                    <button
                                      type="button"
                                      className="btn btn-secondary btn-sm"
                                      onClick={() =>
                                        push({
                                          text: "",
                                          isCorrect: false,
                                        })
                                      }
                                    >
                                      Add Option
                                    </button>
                                  </div>
                                )}
                              </FieldArray>
                            )}

                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm mt-3"
                              onClick={() => remove(index)}
                            >
                              Remove Question
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>

                  <button className="btn btn-success w-100 mt-3" type="submit">
                    Create Quiz
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}