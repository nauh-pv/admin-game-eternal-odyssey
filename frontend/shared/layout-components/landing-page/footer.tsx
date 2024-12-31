import Image from "next/image";
import Link from "next/link";
import data from "@/shared/data/landing.json";
const Footer = () => {
  return (
    <section className="section landing-footer text-white text-[0.813rem] dark:!bg-bgDark">
      <div className="container">
        <div className="separator-animated animated-true mb-5"></div>
        <div className="grid grid-cols-12 gap-6">
          <div className="xl:col-span-4 col-span-12">
            <div className="px-6">
              <p className="font-semibold mb-4">
                <Link aria-label="anchor" href="/components/dashboards/crm/">
                  <Image
                    src="/assets/images/brand-logos/logo.png"
                    alt="logo"
                    width={200}
                    height={200}
                  />
                </Link>
              </p>
              <p className="mb-2 opacity-[0.6] font-normal">
                {data.footer.description1}
              </p>
              <p className="mb-0 opacity-[0.6] font-normal">
                {data.footer.description2}
              </p>
            </div>
          </div>
          {data.footer.itemMenu &&
            data.footer.itemMenu.map((item, index) => {
              return (
                <div className="xl:col-span-2 col-span-12" key={index}>
                  <div className="px-6">
                    <h6 className="font-semibold text-[1rem] mb-4">
                      {item.group}
                    </h6>
                    <ul className="list-unstyled opacity-[0.6] font-normal landing-footer-list">
                      {item.childItem &&
                        item.childItem.map((child, indexChild) => {
                          return (
                            <li key={indexChild}>
                              <Link href="#!" className="text-white">
                                {child.title}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              );
            })}
          {data.footer.itemMenu1 && (
            <div className="xl:col-span-4 col-span-12">
              <div className="px-6">
                <h6 className="font-semibold text-[1rem] mb-2">
                  {data.footer.itemMenu1.group}
                </h6>
                <ul className="list-unstyled font-normal landing-footer-list">
                  {data.footer.itemMenu1.childItem.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link
                          href={item.path}
                          className="text-white opacity-[0.6]"
                        >
                          <i
                            className={`${item.cssIcon} me-1 align-middle`}
                          ></i>
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="mt-4 !mb-0">
                    <p className="mb-2 font-semibold opacity-[0.8] text-[1rem]">
                      {data.footer.followUs}
                    </p>
                    <div className="mb-0">
                      <div className="btn-list">
                        {data.footer.itemMenu2 &&
                          data.footer.itemMenu2.map((item, index) => {
                            return (
                              <button
                                key={index}
                                aria-label="button"
                                type="button"
                                className={`ti-btn ti-btn-sm !mb-0 ${item.cssIcon} me-[0.365rem]`}
                              >
                                <i className={`${item.icon} font-bold`}></i>
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default Footer;
