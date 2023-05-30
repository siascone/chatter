import { useEffect, useState } from 'react'
import './message.css'
import { useSelector } from 'react-redux'

const Message = ({ body, author, mentionedUsernames, createdAt }) => {
    const formattedTime = getFormattedTime(createdAt)

    const [imageUrl, setImageUrl] = useState('https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png')

    // const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (author === 'Demo-lition') {
            setImageUrl("https://www.slashfilm.com/img/gallery/writer-daniel-waters-favorite-demolition-man-joke-never-made-it-into-the-movie/intro-1676959970.jpg")
        }
    })

    return (
        <div className="message">
            <img className="user-image" src={imageUrl} alt=""/>
            <div>
                <span className="message__author">{author} </span>
                <span className="message__timestamp">{formattedTime}</span>
                <p>
                    {getFormattedBody(body, mentionedUsernames)}
                </p>
            </div>
        </div>
    )
}

function getFormattedBody(body, usernames) {
    return usernames.length
        ? body 
            .split(new RegExp(`(${usernames.join('|')})`))
            .map((text, idx) => idx % 2 === 0
                ? text 
                : <strong key={text}>{text}</strong>
            )
        : body;
}

function getFormattedTime (dateString) {
    const date = new Date(dateString)

    const now = new Date();

    const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    ).getTime();

    const startOfYesterday = startOfDay - (1000 * 60 * 60 * 24);

    let formattedTime = date.toLocaleTimeString([], {
        timeStyle: 'short'
    });

    if (date.getTime() < startOfYesterday) {
        formattedTime = date.toDateString();
    } else if (date.getTime() < startOfDay) {
        formattedTime = `Yesterday at ${formattedTime}`
    }

    return formattedTime;
}

export default Message;