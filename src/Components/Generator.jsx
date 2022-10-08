import React from 'react'
import { useState } from 'react'
import qrcode from 'qrcode';
import { useEffect } from 'react';

export default function Generator() {
    // setting the input text 
    const [input, setinput] = useState('');
    // setting the qr code image 
    const [qrimage, setqrimage] = useState('');
    const showmeqr = async()=>{
        try {
            // gives image url of the given input
            const respose = await qrcode.toDataURL(input);
            setqrimage(respose);
        } catch (error) {
            console.log(error);
        }
    }

    //Tthank You text
    var words = ['Thank You for choosing us...'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;
    var wordflick = function () {
      setInterval(function () {
        if (forwards) {
          if (offset >= words[i].length) {
            ++skip_count;
            if (skip_count === skip_delay) {
              forwards = false;
              skip_count = 0;
            }
          }
        }
        else {
          if (offset === 0) {
            forwards = true;
            i++;
            offset = 0;
            if (i >= len) {
              i = 0;
            }
          }
        }
        part = words[i].substr(0, offset);
        if (skip_count === 0) {
          if (forwards) {
            offset++;
          }
          else {
            offset--;
          }
        }
        document.getElementById("txtext").innerText=part;
      },speed);
    };
    useEffect(() => {
        
        wordflick();
    }, [])

  return (
    <div className='container' >
        <div>
            <h2 className='title'>Free QR Code Generator</h2>
        </div>
        <div className="card">
                <div className='innerbody'>
                    <input  placeholder='Enter here' type="text" onChange={(e)=>setinput(e.target.value)} />
                    <button type="submit" onClick={()=>showmeqr()}>Show QR</button>
                </div>
                <div className='displayQR'>
                    {qrimage? (<img src={qrimage} alt="qrimgnotfount" />) : null}
                </div>
                <div>
                    <p id='txtext'></p>
                </div>
        </div>
    </div>
  )
}
