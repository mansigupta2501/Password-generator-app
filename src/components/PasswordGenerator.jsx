import { useState, useCallback, useEffect, useRef } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [upperCaseAllowed, setUpperCaseAllowed] = useState(true);
  const [lowerCaseAllowed, setLowerCaseAllowed] = useState(false);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [disableCopy, setDisableCopy] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+=<>?/[]{}~";

    let validChars = "";
    if (upperCaseAllowed) validChars += upper;
    if (lowerCaseAllowed) validChars += lower;
    if (numbersAllowed) validChars += numbers;
    if (symbolsAllowed) validChars += symbols;

    if (!validChars) {
      setPassword("Please select at least one option");
      setDisableCopy(true);
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      newPassword += validChars[index];
    }
    setDisableCopy(false);
    setPassword(newPassword);
  }, [
    length,
    upperCaseAllowed,
    lowerCaseAllowed,
    numbersAllowed,
    symbolsAllowed,
  ]);

  useEffect(() => {
    generatePassword();
  }, [
    length,
    upperCaseAllowed,
    lowerCaseAllowed,
    numbersAllowed,
    symbolsAllowed,
    generatePassword,
  ]);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      passwordRef.current?.select();
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed: ", err);
    }
  };

  return (
    <>
      <div className="w-full max-w-md shadow-lg mx-auto rounded-xl px-6 py-7 bg-[#1f1b2e] text-white">
        <h2 className="text-white text-2xl font-semibold text-center mb-6">
          Unique Password Generator
        </h2>
        <div className="flex shadow-inner rounded-md overflow-hidden mb-4 bg-white">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            className="outline-none w-full py-2 px-3 text-gray-800 font-mono text-sm bg-white rounded-md"
            readOnly
          />
        </div>

        <button
          className={`px-4 py-2 w-full font-semibold transition-all duration-200 rounded-md ${
            disableCopy
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#6e39d2] to-[#ae48c7] hover:from-[#5c30aa] hover:to-[#9a3db5] transition-colors duration-300 cursor-pointer active:bg-orange-700 text-white"
          }`}
          disabled={disableCopy}
          onClick={handleCopyToClipboard}
        >
          {copied ? "✅ Copied!" : "📋 Copy to Clipboard"}
        </button>

        <div className="flex flex-col gap-4 text-sm text-white mt-6">
          <div>
            <label htmlFor="lengthCount" className="block font-medium mb-1">
              Password Length: <span className="text-white">{length}</span>
            </label>
            <input
              type="range"
              min={6}
              max={50}
              id="lengthCount"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full [accent-color:#a362ea]"
            />
          </div>

          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2 w-1/2 justify-start">
              <input
                type="checkbox"
                id="includeUppercase"
                checked={upperCaseAllowed}
                onChange={() => setUpperCaseAllowed((prev) => !prev)}
                className="accent-[#a362ea]"
              />
              <label htmlFor="includeUppercase">Include Uppercase</label>
            </div>

            <div className="flex items-center gap-2 w-1/2 justify-start">
              <input
                type="checkbox"
                id="includeLowercase"
                checked={lowerCaseAllowed}
                onChange={() => setLowerCaseAllowed((prev) => !prev)}
                className="accent-[#a362ea]"
              />
              <label htmlFor="includeLowercase">Include Lowercase</label>
            </div>
          </div>

          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2 w-1/2">
              <input
                type="checkbox"
                id="includeNumbers"
                checked={numbersAllowed}
                onChange={() => setNumbersAllowed((prev) => !prev)}
                className="accent-[#a362ea]"
              />
              <label htmlFor="includeNumbers">Include Numbers</label>
            </div>
            <div className="flex items-center gap-2 w-1/2">
              <input
                type="checkbox"
                id="includeSymbols"
                checked={symbolsAllowed}
                onChange={() => setSymbolsAllowed((prev) => !prev)}
                className="accent-[#a362ea]"
              />
              <label htmlFor="includeSymbols">Include Symbols</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
