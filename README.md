# Phoneme inventory generator

## Table of Contents
1. [Purpose](#purpose)
2. [Features yet to be implemented](#features)
3. [Screenshot](#examples)

## Purpose<a name="purpose"></a>

This tool builds random phoneme inventories using some preselected parameters:
* Minimum and maximum number of consonants
* Minimum and maximum number of vowels
* Whether to use a [IPA](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet) list, [X-SAMPA](https://en.wikipedia.org/wiki/X-SAMPA), or a simpler list of phoneme options
* Also for X-SAMPA only: which types of consonant or vowel to include/exclude, eg. voiced plosive consonants, lax rounded vowels
* What delimiter to use in the output list (default: comma)

## Features yet to be implemented<a name="features"></a>

* Option to generate vowel oligophthongs and consonant clusters, including affricates
* Add non-pulmonic and other exotic consonants for X-SAMPA and IPA, eg. clicks
* For IPA create same choice of which types of consonant or vowel to include/exclude
* Considerations for naturalness baned on phonological constraints and phoneme frequencies
* Tie in to the [word generator](https://github.com/aaa2016/word-generator/) tool to generate sample words

## Screenshot<a name="examples"></a>

![Screenshot of tool](https://github.com/aaa2016/phoneme-inventory-generator/blob/master/example.png)