import * as React from "react"
import { useState } from "react"
import { format, startOfToday } from "date-fns";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {Stars} from "@/components/ui/stars.tsx"
import {Date} from "@/components/ui/date"
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { Label } from "@/components/ui/label"


export function Log({ albumID, albumName} ) {
  const [log, setLog] = useState("");
  const [logs, setLogs] = useState([]);
  const [clickedStar, setClickedStar] = useState(1);

  const [review, setReview] = useState("");

  const [title, setTitle] = useState("");
  const [titles, setTitles] = useState([]);

  const [date, setDate] = useState(startOfToday());
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();
  

  const resetForm = (e) => {
    e.preventDefault();
    setTitle('');
    setReview('');
    setClickedStar(1);
    setDate(startOfToday());
  }
  const submitLog = async (e) => {
    e.preventDefault();
    const newLog = {
      profile: "Test",
      albumID: albumID,
      albumName: albumName,
      review: review,
      rating: clickedStar,
      date: date,
    };
    console.log(newLog);
    try {
      await axios.post("http://localhost:8808/song_reviews", newLog);
      console.log("Log submitted successfully!");
      resetForm(e);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <head> <script src="https://kit.fontawesome.com/99109dcc0b.js" crossOrigin="anonymous"></script></head>
    <div className="Card white-border dark">
    
    <Card className="w-[400px] rounded-lg">
      <CardHeader>
        <CardTitle>Log a Review</CardTitle>
        <CardDescription> </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
             <Label htmlFor="Song Title">Album Title: {albumName}</Label>
              {/* <Input
              id="title"
              type="text"
              value={title} // Controlled value
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter song title" /> */}
              </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Review">Review: </Label>
              <Textarea id="review" 
              placeholder="Write a Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}/> 
            </div> 
            {/* fiture out class names  */}

            <div className="flex items-center space-x-2">
            <label
              htmlFor="listen"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
             I listened to this on 
            </label>
            <Date 
              selectedDate={date}
              onSelectDate={setDate}
            />
            </div >
            <div className="flex justify-center">
              <Stars 
                selectedStar = {clickedStar}
                setSelectedStar = {setClickedStar}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick = {(e) => resetForm(e)}>Reset</Button>
        <Button variant="default" 
        disabled={title === '' && review === ''}
        onClick = {(e) => submitLog(e)}>
          Log</Button>
          
      </CardFooter>
    </Card>
    </div>
    </>
  )
}

export default Log;
 