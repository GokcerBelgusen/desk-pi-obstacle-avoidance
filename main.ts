function left () {
    pins.analogWritePin(AnalogPin.P13, 250)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P16, 250)
    pins.analogWritePin(AnalogPin.P15, 0)
}
function stop () {
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P16, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
}
function backward () {
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P13, 500)
    pins.analogWritePin(AnalogPin.P16, 0)
    pins.analogWritePin(AnalogPin.P15, 500)
}
function forward () {
    pins.analogWritePin(AnalogPin.P14, 1000)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P16, 1000)
    pins.analogWritePin(AnalogPin.P15, 0)
}
led.enable(false)
let strip = neopixel.create(DigitalPin.P6, 4, NeoPixelMode.RGB)
basic.showIcon(IconNames.Happy)
makerbit.connectUltrasonicDistanceSensor(DigitalPin.P12, DigitalPin.P9)
OLED12864_I2C.init(60)
basic.forever(function () {
    OLED12864_I2C.clear()
    OLED12864_I2C.showNumber(
    0,
    0,
    makerbit.getUltrasonicDistance(DistanceUnit.CM),
    1
    )
    basic.pause(100)
    if (makerbit.getUltrasonicDistance(DistanceUnit.CM) < 40) {
        stop()
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
        basic.showIcon(IconNames.Sad)
        strip.showColor(neopixel.colors(NeoPixelColors.White))
        backward()
        basic.pause(1000)
        left()
        basic.pause(1000)
        stop()
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        basic.pause(1000)
    } else {
        forward()
        basic.showIcon(IconNames.Happy)
    }
})
