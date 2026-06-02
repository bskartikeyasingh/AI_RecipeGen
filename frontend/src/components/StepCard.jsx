function StepCard({ step }) {

  const speakStep = () => {

    const speech =
      new SpeechSynthesisUtterance(
        step.voice_text ||
        step.instruction
      );

    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(
      speech
    );
  };

  return (

    <div
      className="
      bg-gray-800
      rounded-xl
      p-5
      mb-6
      shadow-lg
      "
    >

      <img
        src={step.image_url}
        alt={`Step ${step.step}`}
        className="
        w-full
        rounded-xl
        mb-4
        "
      />

      <h3
        className="
        text-xl
        font-bold
        text-white
        "
      >
        Step {step.step}
      </h3>

      <p
        className="
        text-gray-300
        mt-2
        mb-4
        "
      >
        {step.instruction}
      </p>

      <button
        onClick={speakStep}
        className="
        bg-green-600
        hover:bg-green-700
        px-4
        py-2
        rounded-lg
        text-white
        "
      >
        🔊 Play Narration
      </button>

    </div>

  );
}

export default StepCard;