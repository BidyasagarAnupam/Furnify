#include <bits/stdc++.h>
using namespace std;
bool isPrimeorNot(int n) {
    if (n <= 1)
        return false;
    if (n <= 3)
        return true;
    if (n % 2 == 0 || n % 3 == 0)
        return false;
    for (int i = 5; i * i <= n; i = i + 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    }
    return true;
}

vector<int> primeNo(int n) {
    vector<int> primes;
    int num = 2; // Start from the first prime number
    while (primes.size() < n) {
        if (isPrimeorNot(num)) {
            primes.push_back(num);
        }
        num++;
    }
    return primes;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        if (n == 1) cout << 1 << endl;
        else if (n == 2) cout << 2 << " " << 2 << endl;
        else {
            vector<int> prime = primeNo(n / 2);
            vector<int> myans;

            if (n & 1) myans.push_back(1);

            for (auto it : prime) {
                myans.push_back(it);
                myans.push_back(it);
            }

            for (auto it : myans) cout << it << " ";
            cout << endl;
        }

    }

}