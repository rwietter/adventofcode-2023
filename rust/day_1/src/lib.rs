use std::collections::HashMap;

pub struct Config<'g> {
    pub num_words: Vec<&'g str>,
    pub map: HashMap<&'g str, &'g str>,
}

#[derive(Debug)]
struct NumPosition<'a> {
    index: i32,
    value: &'a str,
}

fn match_elements<'a>(calibration: &'a str, config: &'a Config) -> i32 {
    let mut positions: Vec<NumPosition<'_>> = Vec::new();
    for (_, pattern) in config.num_words.iter().enumerate() {
        let all_occurrences: Vec<(usize, &str)> = calibration.match_indices(pattern).collect();

        if all_occurrences.is_empty() {
            continue;
        }

        all_occurrences.iter().for_each(|(index, _)| {
            let num_position: NumPosition<'_> = NumPosition {
                index: index.to_string().parse::<i32>().unwrap(),
                value: pattern,
            };
            positions.push(num_position);
        });
    }

    positions.sort_by_key(|k: &NumPosition<'_>| k.index);

    let mut first_char: &str = positions.first().unwrap().value;
    let mut last_char: &str = positions.last().unwrap().value;

    if config.map.contains_key(first_char) {
        first_char = config.map.get(first_char).unwrap()
    }

    if config.map.contains_key(last_char) {
        last_char = config.map.get(last_char).unwrap();
    }

    let result: String = format!("{}{}", first_char, last_char);

    result.parse::<i32>().unwrap()
}

pub fn trebuchet(str: String, config: &Config) -> i32 {
    let result: Vec<i32> = str
        .split(" ")
        .map(|line: &str| match_elements(line, &config))
        .collect();
    let sum: i32 = result.iter().sum::<i32>();
    sum
}

fn config() -> Config<'static> {
    let mut map = HashMap::new();
    map.insert("one", "1");
    map.insert("two", "2");
    map.insert("three", "3");
    map.insert("four", "4");
    map.insert("five", "5");
    map.insert("six", "6");
    map.insert("seven", "7");
    map.insert("eight", "8");
    map.insert("nine", "9");
    let config: Config<'_> = Config {
        num_words: vec![
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "one", "two", "three", "four", "five",
            "six", "seven", "eight", "nine",
        ],
        map,
    };
    config
}

fn contents() -> String {
    let contents =
        std::fs::read_to_string("day1.txt").expect("Something went wrong reading the file");
    contents
}

#[cfg(test)]
mod tests {
    use std::fs;

    use super::*;

    #[test]
    fn should_return_64() {
        let config = config();
        assert!(trebuchet("6three2sixsix9eightfour".to_string(), &config) == 64,);
    }

    #[test]
    fn should_return_82() {
        let config = config();
        assert!(trebuchet("tgkfk8ninestnk2eightoneeightwotcs".to_string(), &config) == 82,);
    }

    #[test]
    fn should_return_142() {
        let config = config();
        assert!(
            trebuchet(
                "1abc2 pqr3stu8vwx a1b2c3d4e5f treb7uchet".to_string(),
                &config
            ) == 142,
        );
    }

    #[test]
    fn should_return_281() {
        let config = config();
        assert!(trebuchet("two1nine eightwothree abcone2threexyz xtwone3four 4nineeightseven2 zoneight234 7pqrstsixteen".to_string(), &config) == 281);
    }

    #[test]
    fn should_return_27() {
        let config = config();
        assert!(
            trebuchet(
                "znmfvdlhvjtwo9three4tzjqcfcgnsevenccvnsjczlpm".to_string(),
                &config
            ) == 27,
        );
    }

    #[test]
    fn should_return_87() {
        let config = config();
        assert!(trebuchet("eight226three5sevenhhxhqxns".to_string(), &config) == 87,);
        assert!(trebuchet("jbtfkfourggc5zkc3nineninekv 379eight".to_string(), &config) == 87,);
    }

    #[test]
    fn should_return_45() {
        let config = config();
        assert!(trebuchet("nrtjrkkfour6fivefour7fivertjnxbbzg".to_string(), &config) == 45);
    }

    #[test]
    fn should_return_54875() {
        let config = config();
        let contents = contents();
        assert!(trebuchet(contents, &config) == 54875, "error"); // gold star
    }
}
