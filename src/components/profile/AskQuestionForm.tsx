import { Button, Textarea, Switch } from "@nextui-org/react";

function AskQuestionForm() {
  return (
    <form action="">
      <Textarea name="question" placeholder="Ask a Question!" />
      <div className="my-2 flex justify-between">
        <Button className="bg-red-400 text-white">Ask anonymously</Button>
        <Switch defaultSelected color="danger"></Switch>
      </div>
    </form>
  );
}

export default AskQuestionForm;
