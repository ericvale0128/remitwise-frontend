import { CheckIcon } from "@heroicons/react/solid"
import Container from "app/components/Container"
import { SEND_STEPS } from "app/constants/steps"
import { classNames } from "app/functions"
import Head from "next/head"
import { useEffect, useState } from "react"
import StepZero from "./StepZero"
import StepOne from "./StepOne"
import StepTwo from "./StepTwo"
import StepThree from "./StepThree"
import StepFour from "./StepFour"

const SendMoney = () => {
  const [step, setStep] = useState(1)
  const [wndWidth, setWndWidth] = useState(innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWndWidth(innerWidth)
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rateStatus = <>
    <p className="text-sm text-disabled">24 Hour Limit</p>
    <p className="text-sm md:text-base text-primary">$ 1,000,000 OF $ 1,000,000 REMAINING</p>
  </>

  return (
    <Container id="send-page" className="!border-0" maxWidth="7xl">
      <Head>
        <title key="title">Send Money | RemitWise</title>
        <meta key="description" name="description" content="Send Money RemitWise" />
      </Head>
      <div className="flex-col w-full h-screen pt-6 bg-white lg:flex lg:flex-row lg:pt-20">
        <div className="pt-10 overflow-hidden bg-white border-b lg:min-w-80 h-36 lg:h-full lg:border-r border-stroke">
          <div className="transition-all ease-out duration-1000 lg:translate-x-0" style={{ translate: wndWidth >= 1024 ? 0 : `calc(${wndWidth / 2}px - ${9 + ((step >= 1 ? step : 1) - 1) * 19.5}rem` }}>
            <hr className="w-[58.5rem] lg:w-60 border-stroke lg:rotate-90 origin-left translate-x-36 lg:translate-x-6 translate-y-6" />
            <div className="flex gap-6 lg:grid">
              {SEND_STEPS.map((item, index) =>
                <div key={index} className="z-10 grid">
                  <div className="grid items-center gap-2 lg:flex justify-items-center lg:gap-4">
                    <div className={classNames("flex w-12 h-12 justify-center items-center p-2 rounded-full transition-all", (step >= 1 ? step : 1) === index + 1 ? "bg-light-green" : (step >= 1 ? step : 1) > index + 1 ? "bg-transparent" : "bg-transparent")}>
                      <div className={classNames("flex w-8 h-8 justify-center items-center rounded-full font-bold transition-all", (step >= 1 ? step : 1) === index + 1 ? "bg-success text-white" : (step >= 1 ? step : 1) > index + 1 ? "bg-white text-success border-success border-2" : "bg-stroke text-disabled")}>
                        {(step >= 1 ? step : 1) <= index + 1 ? index + 1 : <CheckIcon width={18} />}
                      </div>
                    </div>
                    <p className={classNames("w-72 text-center lg:text-left", (step >= 1 ? step : 1) === index + 1 ? "font-bold" : (step >= 1 ? step : 1) > index + 1 ? "font-semibold" : "font-normal")}>{item.title}</p>
                  </div>
                  <p className="h-4 text-sm text-center lg:ml-16 lg:-mt-2 lg:text-left">{(step >= 1 ? step : 1) > index + 1 ? item.message : ""}</p>
                </div>
              )}
            </div>
          </div>
          <hr className="hidden w-full my-6 lg:grid border-t-1 border-stroke" />
          <div className="hidden font-semibold uppercase lg:grid">{rateStatus}</div>
        </div>
        <div className="w-full p-6 bg-white md:p-8 lg:p-10">
          {step === 0 && <StepZero handleMove={setStep} />}
          {step === 1 && <StepOne handleMove={setStep} />}
          {step === 2 && <StepTwo handleMove={setStep} />}
          {step === 3 && <StepThree handleMove={setStep} />}
          {step === 4 && <StepFour handleMove={setStep} />}
        </div>
        <div className="grid w-full px-6 lg:hidden md:px-8">
          <hr className="grid w-full mb-4 lg:hidden border-t-1 border-stroke" />
          <div className="grid font-semibold uppercase lg:hidden">{rateStatus}</div>
        </div>
      </div>
    </Container>
  )
}

export default SendMoney