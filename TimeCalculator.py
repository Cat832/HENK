def convertTime (s):
    hours = s // 3600

    leftover_seconds = s % 3600

    minutes = leftover_seconds // 60

    seconds = leftover_seconds % 60

    return str(hours) + "h " + str(minutes) + "m " + str(seconds);


print(convertTime(49115))









print(convertTime(47915))
