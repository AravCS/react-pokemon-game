export default function Preview({ togglePreview }) {
    return (
        <div className="max-w-xl mx-auto mt-20 p-8 bg-gradient-to-br from-indigo-900 via-blue-900 rounded-2xl shadow-[0_0_25px_#ffcb05] text-yellow-400 font-sans text-center select-none">
            <h1 className="text-6xl mb-6 tracking-widest [text-shadow:2px_2px_6px_#000a12]">
                Pokémon Memory Game
            </h1>
            <p className="text-xl mb-5 leading-relaxed [text-shadow:1px_1px_3px_#000a12]">
                To win, you have to click each card only once. The cards will shuffle after each click.
                If you click the same card more than once, you lose!
            </p>
            <p className="text-xl mb-5 leading-relaxed [text-shadow:1px_1px_3px_#000a12]">
                Each card is a Pokémon with its name shown on the button.
            </p>
            <button
                onClick={togglePreview}
                className="bg-blue-800 text-white font-semibold text-xl py-3 px-9 rounded-xl shadow-md transition-all duration-200 hover:bg-blue-900 hover:shadow-lg active:translate-y-[1px] active:shadow-sm"
            >
                Start Game
            </button>
        </div>
    );
}
