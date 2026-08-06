export function speak(text: string) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.lang = 'vi-VN'
  utt.rate = 0.85
  utt.pitch = 1.0
  const voices = window.speechSynthesis.getVoices()
  const vnVoice = voices.find((v) => v.lang.startsWith('vi'))
  if (vnVoice) utt.voice = vnVoice
  window.speechSynthesis.speak(utt)
}
