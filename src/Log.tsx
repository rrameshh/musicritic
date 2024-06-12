import * as React from "react";
import { useState } from "react";
import { startOfToday } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Stars from "@/components/ui/stars.tsx";
import DateSelector from "@/components/ui/date";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios, { AxiosResponse } from 'axios';
import { Label } from "@/components/ui/label";

interface LogProps {
  albumID: string;
  albumName: string;
}

export function Log({ albumID, albumName }: LogProps) {
  const [clickedStar, setClickedStar] = useState<number>(1);
  const [review, setReview] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [date, setSelectedDate] = useState<Date | undefined>(startOfToday());

  const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTitle('');
    setReview('');
    setClickedStar(1);
    setSelectedDate(startOfToday());
  }

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const submitLog = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const temp = localStorage.getItem('userProfile');
    const user = JSON.parse(temp);

    const newLog = {
      profile: user.displayName,
      albumID: albumID,
      albumName: albumName,
      review: review,
      rating: clickedStar,
      date: date,
    };
    console.log(newLog);
    try {
      const response: AxiosResponse = await axios.post("https://marked-boats-production.up.railway.app/song_reviews/", newLog);
      console.log(response);
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
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Review">Review: </Label>
                  <Textarea id="review"
                    placeholder="Write a Review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)} />
                </div>
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="listen"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I listened to this on
                  </label>
                  <DateSelector
                    selectedDate={date}
                    onSelectDate={handleSelectDate} // Changed to handleSelectDate
                  />
                </div>
                <div className="flex justify-center">
                  <Stars
                    selectedStar={clickedStar}
                    setSelectedStar={setClickedStar}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={(e) => resetForm(e)}>Reset</Button>
            <Button variant="default"
              disabled={title === '' && review === ''}
              onClick={(e) => submitLog(e)}>
              Log</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default Log;
