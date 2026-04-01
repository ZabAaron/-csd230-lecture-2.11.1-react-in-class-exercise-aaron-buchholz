package csd230.seeder;

import csd230.entities.*;
import csd230.repositories.*;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final TShirtRepository tShirtRepository;
    private final JacketRepository jacketRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Faker faker;

    public DataSeeder(BookRepository bookRepository, MagazineRepository magazineRepository,
                      TShirtRepository tShirtRepository, JacketRepository jacketRepository,
                      UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.tShirtRepository = tShirtRepository;
        this.jacketRepository = jacketRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.faker = new Faker();
    }

    @Override
    public void run(String... args) throws Exception {
        if (bookRepository.count() == 0) {
            seedBooks();
            seedMagazines();
            seedTShirts();
            seedJackets();
        }
        if (userRepository.count() == 0) {
            seedUsers();
        }
    }

    private void seedUsers() {
        UserEntity admin = new UserEntity("admin", passwordEncoder.encode("admin"), "ADMIN");
        userRepository.save(admin);
        UserEntity user = new UserEntity("user", passwordEncoder.encode("user"), "USER");
        userRepository.save(user);
    }

    private void seedBooks() {
        for (int i = 0; i < 10; i++) {
            BookEntity book = new BookEntity(
                    faker.book().title(),
                    faker.number().randomDouble(2, 10, 100),
                    faker.number().numberBetween(1, 50),
                    faker.book().author()
            );
            bookRepository.save(book);
        }
    }

    private void seedMagazines() {
        for (int i = 0; i < 5; i++) {
            LocalDateTime issueDate = faker.date().past(365, TimeUnit.DAYS)
                    .toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

            MagazineEntity mag = new MagazineEntity(
                    faker.book().publisher() + " Weekly",
                    faker.number().randomDouble(2, 5, 20),
                    faker.number().numberBetween(10, 100),
                    faker.number().numberBetween(100, 500),
                    issueDate
            );
            magazineRepository.save(mag);
        }
    }

    private void seedTShirts() {
        String[] sizes = {"S", "M", "L", "XL", "XXL"};
        String[] sleeves = {"Short", "Long", "3/4"};
        for (int i = 0; i < 5; i++) {
            TShirtEntity tshirt = new TShirtEntity(
                    sizes[faker.number().numberBetween(0, sizes.length)],
                    faker.number().randomDouble(2, 15, 60),
                    faker.number().numberBetween(5, 30),
                    sleeves[faker.number().numberBetween(0, sleeves.length)]
            );
            tShirtRepository.save(tshirt);
        }
    }

    private void seedJackets() {
        String[] sizes = {"S", "M", "L", "XL", "XXL"};
        for (int i = 0; i < 5; i++) {
            JacketEntity jacket = new JacketEntity(
                    sizes[faker.number().numberBetween(0, sizes.length)],
                    faker.number().randomDouble(2, 50, 200),
                    faker.number().numberBetween(3, 20),
                    faker.bool().bool()
            );
            jacketRepository.save(jacket);
        }
    }
}
